const body = document.querySelector("body"); // Select the body element to append new elements to it

const footer = document.createElement("footer"); // Create a new footer element to hold the copyright information
body.appendChild(footer); // Append the footer to the body of the document

const today = new Date(); // Get the current date to extract the current year for the copyright notice
const thisYear = today.getFullYear(); // Extract the current year from the date object
const copyright = document.createElement("p"); // Create a new paragraph element to hold the copyright text

copyright.innerHTML = `&copy; Demetrius Edwards ${thisYear}`; // Set the inner HTML of the paragraph to include the copyright symbol, name, and current year
footer.appendChild(copyright); // Append the copyright paragraph to the footer element

const skills = ['JavaScript', 'React', 'Node.js', 'Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS']; // Create an array of skills to be displayed in the Skills section of the webpage
const skillsSection = document.getElementById("Skills"); // Select the Skills section of the webpage using its ID to append the list of skills to it
const skillsList = skillsSection.querySelector("ul"); // Select the unordered list element within the Skills section to append individual skill items to it

/* 
Loop through the skills array, create a list item for each skill, 
set its text to the skill name, and append it to the unordered list in the Skills section
*/
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

const messageForm = document.forms["leave_message"];
messageForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = messageForm.usersName.value;
  const email = messageForm.usersEmail.value;
  const message = messageForm.usersMessages.value;

  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

  messageForm.reset();
});
