📦 Inventory Management System

An internal inventory management system built for tracking, updating, and exporting IT equipment data across teams. Designed with a clean UI, persistent database, and spreadsheet export capabilities to streamline physical asset tracking.

🚀 Features
Live Dashboard to view inventory counts across laptops, peripherals, shipping, and cleaning supplies
Form Input System to quickly record item usage or returns
Editable Summary Table with inline quantity updates
CSV Export matching the original inventory spreadsheet layout and styling
Historical Snapshots of past inventory states
Default Quantity Items (e.g. gloves, shipping tape) are auto-filled and editable
Grouped & Colored Excel Export with accurate categories, spacing, and formatting
(Planned) User Authentication for secure team-based access
(Planned) Audit Log and Role-Based Access Controls
🛠️ Tech Stack
Layer	Tools Used
Frontend	React, Tailwind CSS
Backend	Flask (Python)
Database	Supabase (PostgreSQL)
Export	Python’s openpyxl and pandas for Excel formatting
Deployment	Vercel (Frontend), Render (Backend)
📷 Screenshots
Coming Soon – include a screenshot or GIF of the dashboard and export file preview
📂 Folder Structure (Example)
📁 client/              # React frontend
📁 server/              # Flask backend
📁 data/                # Exported Excel files
📁 supabase/            # Supabase setup and schema
📄 Export Format Example
Your exported spreadsheet will look exactly like the original template:

✅ Grouped by Category (Laptops, Peripherals, etc.)
✅ Colored section headers (green for laptops, orange for peripherals)
✅ Bold fonts, correct spacing, and alignment
✅ Columns: Item, Min., Count
✅ Filename includes today’s date
🧪 How to Run Locally
# Frontend
cd client
npm install
npm run dev

# Backend
cd server
pip install -r requirements.txt
flask run
Create a .env file to securely store your Supabase API keys.
✅ Status
 Track inventory counts
 Editable summary table
 Clean CSV/Excel export
 Authentication system (coming soon)
 Role-based access & audit log (in progress)
