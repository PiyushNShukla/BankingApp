
        // LOGIN CREDENTIALS HERE--------------
        const MOCK_USER = { email: "a", password: "p" };

        function handleLogin() {
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;

            if (email === MOCK_USER.email && pass === MOCK_USER.password) {
                document.getElementById('login-page').classList.add('hidden');
                document.getElementById('home-page').classList.remove('hidden');
                document.getElementById('welcome-modal').classList.remove('hidden');
            } else {
                document.getElementById('error-msg').classList.remove('hidden');
            }
        }

        function closeModal() {
            document.getElementById('welcome-modal').classList.add('hidden');
        }

        function handleLogout() {
            location.reload();
        }

        // Feature Navigation Simulation
        function navigateTo(page) {
            console.log("Navigating to:", page);
            // In the next step, we will hide 'home-page' and show the specific feature page
            alert("This will take you to the " + page.toUpperCase() + " page.");
        }