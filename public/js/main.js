const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");

const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");

const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const getInfo = async (event) => {
  event.preventDefault();

  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = "Error!! Please Enter City Name";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0c998cb040f1a46e4a3d01b7136bf963`;
      const response = await fetch(url);

      const data = await response.json();
      const arrData = [data];

      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country} `;
      temp_real_val.innerText = arrData[0].main.temp;

      const tempMood = arrData[0].weather[0].main;

      //condition for icons
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
      }

      datahide.classList.remove("data_hide");

      // console.log(temp_status);//wrong console log kelta mhanun error alta

      //   city_name.innerText = data;
    } catch {
      cityVal = " ";

      datahide.classList.add("data_hide");

      city_name.innerText = "Error!! Please Enter Valid City Name";

      console.log("please add the proper city name");
    }
  }
};

const getCurrentDay = () => {
  let currentTime = new Date();
  let weekDay = currentTime.toLocaleString("en-US", { weekday: "long" });
  return `${weekDay}`;
};

const getCurrentTime = () => {
  let time = new Date();
  let min = time.toLocaleString("en-US", {
    minute: "numeric",
    hour12: false,
  });
  let hours = time.toLocaleString("en-GB", {
    hour: "numeric",
    hour24: true,
  });
  let month = time.toLocaleString("en-IN", { month: "short" });
  let date = time.getDate();
  let period = "AM";
  hours > 11.59 ? ((period = "PM"), (hours = hours - 12)) : period;
  return `${month} ${date} | ${hours}:${min} ${period}`;
};

day.innerHTML = getCurrentDay();
today_date.innerHTML = getCurrentTime();

submitBtn.addEventListener("click", getInfo);
