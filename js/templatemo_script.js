var top_menu_height = 0;
jQuery(function ($) {
  $(window).load(function () {
    $(".external-link").unbind("click");
  });

  $(document).ready(function () {
    // load google map
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" +
      "callback=initialize";
    document.body.appendChild(script);

    top_menu_height = $(".templatemo-top-menu").height();
    // scroll spy to auto active the nav item
    $("body").scrollspy({
      target: "#templatemo-nav-bar",
      offset: top_menu_height + 10,
    });
    $(".external-link").unbind("click");

    // scroll to top
    $("#btn-back-to-top").click(function (e) {
      e.preventDefault();
      scrollTo("#templatemo-top");
    });

    // scroll to specific id when click on menu
    // $(".templatemo-top-menu .navbar-nav a").click(function (e) {
    //   e.preventDefault();
    //   var linkId = $(this).attr("href");
    //   scrollTo(linkId);
    //   if ($(".navbar-toggle").is(":visible") == true) {
    //     $(".navbar-collapse").collapse("toggle");
    //   }
    //   $(this).blur();
    //   return false;
    // });

    $(".templatemo-top-menu .navbar-nav a").click(function (e) {
  var linkId = $(this).attr("href");
  if (linkId.startsWith("#")) {
    e.preventDefault();
    $("html, body").animate(
      { scrollTop: $(linkId).offset().top - top_menu_height },
      600
    );
  }
});
    /*
		var dt = window.atob('IHwgRGVzaWduOiA8YSByZWw9Im5vZm9sbG93IiBocmVmPSJodHRwOi8vd3d3LnRlbXBsYXRlbW8uY29tL3RtLTM5NS11cmJhbmljIiB0YXJnZXQ9Il9wYXJlbnQiPlVyYmFuaWM8L2E+'); // decode the string
		var div = document.getElementById('footer-line');
		div.innerHTML = div.innerHTML + dt;
		*/
    // to stick navbar on top
    $(".templatemo-top-menu ").stickUp();

    // gallery category
    $(".templatemo-gallery-category a").click(function (e) {
      e.preventDefault();
      $(this).parent().children("a").removeClass("active");
      $(this).addClass("active");
      var linkClass = $(this).attr("href");
      $(".gallery").each(function () {
        if ($(this).is(":visible") == true) {
          $(this).hide();
        }
      });
      $(linkClass).fadeIn();
    });

    //gallery light box setup
    $("a.colorbox").colorbox({
      rel: function () {
        return $(this).data("group");
      },
    });
  });
});

function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(16.8451789, 96.1439764),
  };

  var map = new google.maps.Map(
    document.getElementById("map-canvas"),
    mapOptions
  );
}

// scroll animation
function scrollTo(selectors) {
  if (!$(selectors).size()) return;
  var selector_top = $(selectors).offset().top - top_menu_height;
  $("html,body").animate({ scrollTop: selector_top }, "slow");
}

// document.addEventListener("DOMContentLoaded", function () {
//   let popupOverlay = document.getElementById("popupOverlay");
//   let closeBtn = document.querySelector(".close-btn");

//   // Show on every page reload (default state is display:flex in HTML)

//   // Close on click X
//   closeBtn.addEventListener("click", function () {
//     popupOverlay.style.display = "none";
//   });

//   // Close when clicking outside the box
//   popupOverlay.addEventListener("click", function (e) {
//     if (e.target === popupOverlay) {
//       popupOverlay.style.display = "none";
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   let popupOverlay = document.getElementById("popupOverlay");
//   let closeBtn = document.querySelector(".close-btn");
//   let form = document.getElementById("inquiryForm");

//   // Show popup only if not submitted before
//   if (!localStorage.getItem("formSubmitted")) {
//     popupOverlay.style.display = "flex";
//   }

//   // Close on click X
//   closeBtn.addEventListener("click", function () {
//     popupOverlay.style.display = "none";
//   });

//   // Close when clicking outside the box
//   popupOverlay.addEventListener("click", function (e) {
//     if (e.target === popupOverlay) {
//       popupOverlay.style.display = "none";
//     }
//   });

//   // Handle form submit
//   form.addEventListener("submit", function (e) {
//     e.preventDefault(); // stop page refresh

//     // here you can send form data via AJAX / fetch to backend
//     alert("Form submitted successfully!");

//     // Save in localStorage to prevent popup again
//     localStorage.setItem("formSubmitted", "true");

//     // Close popup
//     popupOverlay.style.display = "none";
//   });
// });

(function () {
  const overlay = document.getElementById("popupOverlay");
  const closeBtn = document.getElementById("closeBtn");
  const form = document.getElementById("inquiryForm");
  const submitBtn = document.getElementById("submitBtn");

  // Show popup only if not submitted before
  if (!localStorage.getItem("formSubmitted")) {
    overlay.style.display = "flex";
  }

  // Close popup
  function closePopup() {
    overlay.style.display = "none";
  }
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePopup();
  });

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault(); // stop refresh

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const tel = document.getElementById("tel").value.trim();

    if (!name || !email || !tel) {
      alert("Please fill required fields (Name, Email, Telephone).");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    localStorage.setItem("formSubmitted", "true");
    alert("Form submitted successfully!");
    closePopup();

    submitBtn.disabled = false;
    submitBtn.textContent = "SUBMIT NOW";
  }

  form.addEventListener("submit", handleSubmit);
})();

function toggleFaq(element) {
  // Close any open FAQs
  const allItems = document.querySelectorAll(".faq-item");
  const allAnswers = document.querySelectorAll(".faq-answer");

  allItems.forEach((item) => {
    if (item !== element) item.classList.remove("active");
  });
  allAnswers.forEach((answer) => {
    if (answer.previousElementSibling !== element) {
      answer.style.display = "none";
    }
  });

  // Toggle selected
  const answer = element.nextElementSibling;
  const isOpen = element.classList.contains("active");

  if (isOpen) {
    element.classList.remove("active");
    answer.style.display = "none";
  } else {
    element.classList.add("active");
    answer.style.display = "block";
  }
}



  // Function to animate the counters
        function startCount() {
            const counters = document.querySelectorAll('.counter');
            const speed = 2000; // Time taken to reach the target number

            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    const increment = target / speed;

                    if(count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
        }

        // Check if the counter section is in the viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }

        // Initialize the animation when the section is in view
        window.addEventListener('scroll', () => {
            const section = document.querySelector('.counter-section');
            if(isInViewport(section)) {
                startCount();
            }
        });

 document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // stop normal form submission

      // Get field values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate required fields
      if (!name || !email || !phone || !message) {
        alert("Please fill all fields before submitting!");
        return;
      }

      // Format message for WhatsApp
      const whatsappMessage = `*New Enquiry*%0A%0A👤 *Name:* ${name}%0A📧 *Email:* ${email}%0A📞 *Phone:* ${phone}%0A💬 *Message:* ${message}`;

      // Your WhatsApp number (with country code, no + or spaces)
      const phoneNumber = "919545689533";

      // WhatsApp URL
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappURL, "_blank");
    });
  });