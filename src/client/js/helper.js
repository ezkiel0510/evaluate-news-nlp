function createSentimentTags(agreement, score_tag, confidence) {
  const wrapper = document.createElement("div");
  wrapper.className = `sentiment-wrapper`;

  score_tag && createSentimentTag(score_tag, wrapper);
  agreement && createSentimentTag(agreement, wrapper);
  confidence && createSentimentTag(confidence, wrapper);

  document.getElementById("sentiment-results").appendChild(wrapper);
}

function createSentimentTag(att, tag) {
  const ele = document.createElement("p");
  ele.className = `object`;
  if (att === "AGREEMENT") ele.classList.add("agreement");
  if (att === "DISAGREEMENT") ele.classList.add("disagreement");
  let text = "";
  switch (att) {
    case "P+":
      text = document.createTextNode(`Strong Positive`);
      break;
    case "P":
      text = document.createTextNode(`Positive`);
      break;
    case "NEU":
      text = document.createTextNode(`Neutral`);
      break;
    case "N":
      text = document.createTextNode(`Negative`);
      break;
    case "N+":
      text = document.createTextNode(`Strong Negative`);
      break;
    case "NONE":
      text = document.createTextNode(`Without Polarity`);
      break;
    default:
      text = document.createTextNode(`${att}`);
  }
  ele.appendChild(text);
  tag.appendChild(ele);
}

export { createSentimentTag, createSentimentTags };
