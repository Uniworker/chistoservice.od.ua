// SideBar Handler
document.addEventListener("DOMContentLoaded", function () {

	// Service order modal
	const orderModal = new tingle.modal({
		closeMethods: ["overlay", "button", "escape"],
		closeLabel: "Закрити",
		cssClass: ["service-order-modal"],
	});

	orderModal.setContent(
		'<h2 class="text-3xl text-center font-bold text-white">Отримайте консультацію онлайн</h2>' +
        `<div class="text-center w-full md:w-3/4 mx-auto">
        <div class= "col-start-2 col-end-12 col-span-4">
        <form class="w-full validation" novalidate>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="mb-4 text-left">
                    <label for="firstName">Ваше ім'я*</label>
                    <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Вася Пупкін" required >
                </div>
                <div class="mb-4 text-left relative">
                    <label for="phone">Номер телефону*</label>
                    <input type="tel" class="form-control" name="phone" id="phone" placeholder="+38(0__)___ __" required >
                </div>
            </div>
            <div class="grid grid-cols-1">
                <div class="mb-4 text-left col-span-2">
                    <label for="message">Повідомлення</label>
                    <textarea class="form-control" name="message" id="message" rows="7" placeholder="Додаткова інформація"></textarea>
                </div>
            </div>
            <button type="submit" class="inline-flex justify-center w-[95%] py-2 px-6 text-white text-center bg-[#4682B4] rounded uppercase hover:scale-105 transition-scale duration-300">Надіслати</button>
        </form>
                </div >
            </div > `
	);

	document.addEventListener("click", (event) => {
		if (event.target.closest("[data-order-modal]")) {
			orderModal.open();
		}
	});

	// Dropdown Handler
	document.addEventListener("click", (event) => {
		const target = event.target;
		const menuItem = target.closest("[data-d2c-dropdown]");

		if (menuItem) {
			const dropdown = menuItem.closest("li");
			const submenu = dropdown && dropdown.querySelector("[data-d2c-dropdownItem]");

			if (!submenu) {
				return;
			}

			const shouldOpen = submenu.classList.contains("hidden");
			document.querySelectorAll("[data-d2c-dropdownItem]").forEach((item) => {
				item.classList.add("hidden");
			});

			if (shouldOpen) {
				submenu.classList.remove("hidden");
			}
			return;
		}

		if (target.closest("[data-d2c-dropdownItem]")) {
			return;
		}

		document.querySelectorAll("[data-d2c-dropdownItem]").forEach((submenu) => {
			submenu.classList.add("hidden");
		});
	});

	// Form Validation
	const forms = document.querySelectorAll(".validation");

	forms.forEach((form) => {
		const inputFuild = form.querySelectorAll(
			"input[required], select[required], textarea[required]"
		);

		inputFuild.forEach((input) => {
			input.addEventListener("focus", () => {
				removeError(input);
			});
			input.addEventListener("blur", () => {
				validateInput(input);
			});
		});

		form.addEventListener("submit", function (event) {
			event.preventDefault();

			let isValid = true;

			inputFuild.forEach((input) => {
				if (!validateInput(input)) {
					isValid = false;
					input.classList.add("invalid");
				} else {
					input.classList.remove("invalid");
				}
			});

			if (isValid) {
				form.submit();
			}
		});
	});

	// Validation function
	function validateInput(input) {
		const value = input.value.trim();
		const type = input.getAttribute("type");

		if (value === "") {
			setError(input, "Please enter a value");
			return false;
		}

		if (type === "") {
			setError(input, "Please set input");
			return false;
		}

		if (type === "text") {
			if (value.length < 0) {
				setError(input, "Please enter a value");
				return false;
			}
		}

		if (type === "email") {
			const emailPattern =
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			if (!emailPattern.test(value)) {
				setError(input, "Please enter a valid email address.");
				return false;
			}
		}

		if (type === "password") {
			if (value.length < 6) {
				setError(input, "Password must be at least 6 characters.");
				return false;
			}
		}

		removeError(input);
		return true;
	}

	function setError(input, errorMessage) {
		input.classList.add("invalid-input");
		const errorElement = document.getElementById(`${input.id}-error`);
	}

	function removeError(input) {
		input.classList.remove("invalid-input");
		const errorElement = document.getElementById(`${input.id}-error`);
		if (errorElement) {
			errorElement.textContent = "";
		}
	}

    //Slider review
    var slider = tns({
        "container": "#slider",
        "controls": false,
        "items": 2,
        "controlsText": true,
        "autoplay": false,
        "autoplayTimeout": 100,
        "autoplayButton": true,
        "slideBy": "page",
        "mouseDrag": true,
        "swipeAngle": true,
        "speed": 400,
        "nav": true,
        responsive: {
            1024: {
                items: 2
            },
            0: {
                items: 1
            }

        }
    });

	// Tab
	var buttons = document.querySelectorAll(".tab-button");
	buttons.forEach(function (button) {
		button.onclick = function () {
			var tabId = button.getAttribute("data-d2c-tab");
			openTab(tabId);
		};
	});

	function openTab(tabId) {
		var tabContents = document.querySelectorAll(".tab-content");
		tabContents.forEach(function (tabContent) {
			tabContent.classList.add("hidden");
		});

		var tabButtons = document.querySelectorAll(".tab-button");
		tabButtons.forEach(function (button) {
			button.classList.remove("active");
		});

		var tabElement = document.getElementById(tabId);
		if (tabElement) {
			tabElement.classList.remove("hidden");
		}

		var tabButton = document.querySelector(`[data-d2c-tab="${tabId}"]`);
		if (tabButton) {
			tabButton.classList.add("active");
		}
	}

	openTab("tab1");

	// Navbar toggler click event
	var Navbar = document.getElementById("mobile_view_nav");
	var openButton = document.getElementById("navToggoler");
	var closeButton = document.getElementById("navCloser");

	if (Navbar && openButton && closeButton) {
		// Function to open the Navbar
		function openNav() {
			Navbar.classList.remove("translate-x-full");
			Navbar.classList.add("translate-x-0");
		}

		// Function to close the Navbar
		function closeNav() {
			Navbar.classList.remove("translate-x-0");
			Navbar.classList.add("translate-x-full");
		}

		openButton.addEventListener("click", function () {
			openNav();
		});

		closeButton.addEventListener("click", function () {
			closeNav();
		});
	}

	// Clone navigation elements and append to mobile view
	document.querySelectorAll("#js-clone-nav").forEach(function (element) {
		const clonedNav = element.cloneNode(true);
		document.querySelector("#mobile_view_nav").appendChild(clonedNav);
	});
});