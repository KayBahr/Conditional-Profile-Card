import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastname: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  const {
    name = "Lucy Boilett",
    title = "Web Developer",
    location = "Miami, USA",
    avatarURL = "",
    background = "",
    twitter = "",
    github = "",
    linkedin = "",
    instagram = "",
    includeCover = true
  } = variables;

  let cover = includeCover
    ? `<div class="cover"><img src="${background}" /></div>`
    : '<div class="cover"></div>';

  const socialLinks = [
    { icon: "fab fa-twitter", url: twitter },
    { icon: "fab fa-github", url: github },
    { icon: "fab fa-linkedin", url: linkedin },
    { icon: "fab fa-instagram", url: instagram }
  ]
    .filter(link => link.url)
    .map(
      link => `<li><a href="${link.url}"><i class="${link.icon}"></i></a></li>`
    )
    .join("");

  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${avatarURL}" class="photo" />
          <h1>${name}</h1>
          <h2>${title}</h2>
          <h3>${location}</h3>
          <ul class="position-right">
            ${socialLinks}
          </ul>
        </div>
    `;

  const widgetContent = document.querySelector("#widget_content");
  if (widgetContent) {
    widgetContent.innerHTML = html;
  } else {
    console.error("#widget_content element not found");
  }
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
