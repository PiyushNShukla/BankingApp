
        function calculateAge(birthDate) {
            const today = new Date();
            const birth = new Date(birthDate);
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            
            // Adjust age if birthday hasn't happened yet this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        }

        function processSignup() {
            const dobValue = document.getElementById('dob').value;
            
            // 1. Age Validation Check
            if (!dobValue) {
                alert("Please select your Date of Birth.");
                return;
            }

            const age = calculateAge(dobValue);

            if (age < 18) {
                alert("Access Denied: You must be 18 years or older to open a TDD Bank account.");
                return; // Stop the function here
            }

            // 2. Collect other data
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                pass: document.getElementById('password').value,
                address: document.getElementById('address').value,
                state: document.getElementById('state').value,
                pin: document.getElementById('pin').value,
                dob: dobValue
            };

            // 3. Simple Field Validation
            if (!userData.name || !userData.email || !userData.pass || !userData.address || !userData.state || !userData.pin) {
                alert("Please complete all fields to proceed with your application.");
                return;
            }

            // 4. Save to LocalStorage
            localStorage.setItem('bankUser', JSON.stringify(userData));

            // 5. Success and Redirect
            alert("Account verified and created successfully!");
            window.location.href = "index.html";
        }