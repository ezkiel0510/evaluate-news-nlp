const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = "d87ffc82ec9f0103fb3e50c4d3f37866";

function generateSentiment() {
  const text = document.getElementById("text").value;
  getSentiment(baseURL, text, apiKey).then(function (data) {
    postData("/addData", {
      date: newDate,
      temp: data.main.temp,
      feel: feelings,
    });
    // We can call here because of using async in getSentiment function
    updateUI();
  });
}

const getSentiment = async (sentimentURL, text, key) => {
  //   const res = await fetch(sentimentURL + text + key);
  //   try {
  //     const data = await res.json();
  //     data.message
  //       ? (document.getElementById("text-wrong").innerHTML = data.message)
  //       : (document.getElementById("text-wrong").innerHTML = "");
  //     return data;
  //   } catch (error) {
  //     console.log("error", error);
  //   }

  const formdata = new FormData();
  formdata.append("key", key);
  formdata.append("txt", text);
  formdata.append("lang", "en");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = fetch(sentimentURL, requestOptions)
    .then((response) => ({
      status: response.status,
      body: response.json(),
    }))
    .then(({ status, body }) => {
      console.log(status);
      console.log(body);
      return body;
    })
    .catch((error) => console.log("error", error));
  console.log("response :>> ", response);
};

function handleSubmit(event) {
  event.preventDefault();
  //   console.log("::: Form Submitted :::");
  generateSentiment();

  // check what text was put into the form field
  //   let formText = document.getElementById("text").value;
  //   checkForName(formText);
  //   updateUI();
}

// Async POST
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
    document.getElementById("results").innerHTML = data.sentence_list;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
