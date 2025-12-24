export function seedData() {
    console.log("Checking for data seeds...");

    // 1. APPLICATIONS
    if (!localStorage.getItem('baps_applications')) {
        const apps = [];
        const mandirs = ['Vadodara', 'Amdavad', 'Surat', 'Rajkot', 'Navsari', 'Mumbai'];
        const courses = ['B.Tech', 'B.Sc', 'BBA', 'B.Com', 'MBBS'];
        const kotharis = ['P. Tyagvallabh Swami', 'P. Vishwavihar Swami', 'P. Adarshjivan Swami'];

        for (let i = 0; i < 25; i++) {
            apps.push({
                timestamp: Date.now() - Math.floor(Math.random() * 1000000000),
                status: Math.random() > 0.7 ? 'Verified' : (Math.random() > 0.5 ? 'Rejected' : 'Pending'),
                personal: {
                    fullName: `Student ${i + 1} Patel`,
                    email: `student${i + 1}@example.com`,
                    mobile: `+91 98765${Math.floor(10000 + Math.random() * 90000)}`,
                    city: mandirs[Math.floor(Math.random() * mandirs.length)]
                },
                academic: {
                    course: courses[Math.floor(Math.random() * courses.length)]
                },
                verification: {
                    mandir: mandirs[Math.floor(Math.random() * mandirs.length)],
                    kothari: kotharis[Math.floor(Math.random() * kotharis.length)]
                }
            });
        }
        localStorage.setItem('baps_applications', JSON.stringify(apps));
        console.log("Seeded Applications");
    }

    // 2. GATEPASS
    if (!localStorage.getItem('baps_gatepass')) {
        const gatepass = [
            { student: 'Amit Shah', reason: 'Medical Emergency', time: 'Urgent', status: 'Pending' },
            { student: 'Rahul Patel', reason: 'Family Function', time: 'Tomorrow 10 AM', status: 'Approved' },
            { student: 'Priya Sharma', reason: 'Exam', time: 'Today 2 PM', status: 'Pending' },
            { student: 'Ketan Mehta', reason: 'Out of Station', time: 'Weekend', status: 'Rejected' },
            { student: 'Vikas Gupta', reason: 'Shopping', time: 'Today 5 PM', status: 'Pending' },
        ];
        localStorage.setItem('baps_gatepass', JSON.stringify(gatepass));
        console.log("Seeded Gatepass");
    }

    // 3. STAFF
    if (!localStorage.getItem('baps_staff')) {
        const staff = [
            { name: 'Kothari Swami', role: 'Head Admin', mobile: '+91 9876543210', status: 'Active' },
            { name: 'Ramesh Bhai', role: 'Warden', mobile: '+91 9988776655', status: 'Active' },
            { name: 'Suresh Bhai', role: 'Security Head', mobile: '+91 8877665544', status: 'Active' },
            { name: 'Dr. Desai', role: 'Medical Officer', mobile: '+91 7766554433', status: 'On Leave' }
        ];
        localStorage.setItem('baps_staff', JSON.stringify(staff));
        console.log("Seeded Staff");
    }

    // 4. INVENTORY
    if (!localStorage.getItem('baps_inventory')) {
        const inventory = [
            { item: 'Mattress', quantity: 50, status: 'In Stock' },
            { item: 'Study Tables', quantity: 10, status: 'Low Stock' },
            { item: 'Chairs', quantity: 100, status: 'In Stock' },
            { item: 'Brooms', quantity: 5, status: 'Critical' }
        ];
        localStorage.setItem('baps_inventory', JSON.stringify(inventory));
    }
}
