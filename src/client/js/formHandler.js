import { createSentimentTags } from "./helper";

const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = "d87ffc82ec9f0103fb3e50c4d3f37866";

function validateForm(e) {
  e.preventDefault();
  let sentence = document.forms["sentence-form"]["sentence-input"].value;
  const regex = /^[a-zA-Z0-9 .']+$/;
  if (sentence == "") {
    window.alert("Sentence must be filled out");
    return false;
  }
  if (!regex.test(sentence)) {
    window.alert("Sentence contains invalid character(s)");
    return false;
  }
  generateSentiment();
  return true;
}

function generateSentiment() {
  const text = document.getElementById("text").value;
  getSentiment(baseURL, text, apiKey).then(function (data) {
    postData("/addData", {
      ...data,
    });
    // We can call here because of using async in getSentiment function
    updateUI();
  });
}

const getSentiment = async (sentimentURL, text, key) => {
  const formdata = new FormData();
  formdata.append("key", key);
  formdata.append("txt", text);
  formdata.append("lang", "en");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const res = fetch(sentimentURL, requestOptions);

  try {
    const data = await res
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.status.msg && data.status.msg !== "OK"
          ? (document.getElementById("text-wrong").innerHTML = data.status.msg)
          : (document.getElementById("text-wrong").innerHTML = "");
        return data;
      });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

function handleSubmit(e) {
  e.preventDefault();
  validateForm(e);
}

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const res = await fetch("/all");
  try {
    const data = await res.json();
    createSentimentTags(data.agreement, data.score_tag, data.confidence);
  } catch (error) {
    console.log("error", error);
  }
};

const talert = (s) => s.toString();
export { handleSubmit, talert };
