import * as caniuse from "caniuse-api";

const yes = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "Yes.",
];
const likely = [
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Signs point to yes.",
];
const dontknow = [
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
];
const no = [
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

window.magic.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const question = formData.get("question");
  const [feature] = caniuse.find(question);
  const answers = getAnswers(feature);
  const answer = answers[Math.floor(Math.random() * answers.length)];

  window.question.style.visibility = "visible";
  window.feature.innerText = feature || "???";
  window.answer.innerText = answer;

  return false;
});

function getAnswers(feature) {
  if (!feature) {
    return dontknow;
  }
  if (caniuse.isSupported(feature, ">0.5%")) {
    return yes;
  }
  if (caniuse.isSupported(feature, ">5%")) {
    return likely;
  }
  return no;
}
