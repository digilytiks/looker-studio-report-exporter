# looker-studio-report-exporter
A simple browser script to extract all your Looker Studio (formerly Google Data Studio) reports from the home page, including report name, URL, owner, and last edited date, and copy them as CSV for easy import into Google Sheets.

**Features**

- Scrolls the Looker Studio reports page automatically to load all reports.
- Copies all report data to your clipboard in CSV format.
- Safe and lightweight — no installation required.

**Usage**

1. Open Looker Studio.
2. Log in with the Google account that has access to the reports you want to export.
3. Open the Developer Console:
    Windows/Linux: Ctrl+Shift+J
    Mac: Cmd+Option+J
4. Copy the script from this repository.
5. Paste the script into the console and press Enter.
6. Wait for the script to scroll through all reports and collect data.
7. Once completed, the CSV is automatically copied to your clipboard.
8. Open Google Sheets (or Excel) and paste the data (Ctrl+V / Cmd+V).

**Notes**

- The script only finds reports accessible to the logged-in Google account.
- If a report is shared with you but not visible in the "Reports" page, it may not appear.
- Works with any number of reports and automatically handles lazy-loaded pages.
