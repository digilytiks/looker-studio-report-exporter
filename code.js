(async function() {
  console.log("⏳ Scrolling to load all reports...");

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  let lastHeight = 0, sameHeightCount = 0;

  // Scroll until no new reports load
  while (sameHeightCount < 3) {
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(1000);
    const currentHeight = document.body.scrollHeight;
    sameHeightCount = (currentHeight === lastHeight) ? sameHeightCount + 1 : 0;
    lastHeight = currentHeight;
  }

  console.log("✅ Finished scrolling. Collecting report data...");

  // Match links starting with /reporting OR /u/N/reporting
  const links = Array.from(document.querySelectorAll('a[href]'))
    .filter(a => /^\/(u\/\d+\/)?reporting\//.test(a.getAttribute('href')));

  const reports = links.map(a => ({
    name: a.textContent.trim(),
    url: 'https://lookerstudio.google.com' + a.getAttribute('href'),
    owner: a.closest('li')?.querySelector('.cell.owner span')?.textContent.trim() || '',
    date: a.closest('li')?.querySelector('.cell.date span')?.textContent.trim() || ''
  }));

  if (reports.length === 0) console.warn("⚠️ No reports found for this account.");

  console.table(reports);

  // Build CSV
  const csvHeader = `"Report Name","Report URL","Owner","Last Edited"\n`;
  const csvRows = reports.map(r =>
    `"${r.name.replace(/"/g, '""')}","${r.url}","${r.owner.replace(/"/g, '""')}","${r.date}"`
  );
  const csv = csvHeader + csvRows.join('\n');

  // Copy CSV to clipboard
  const el = document.createElement('textarea');
  el.value = csv;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  console.log(`✅ Copied ${reports.length} report(s) to clipboard. Paste into Google Sheets.`);
})();
