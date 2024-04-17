import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function WeaetherList() {
  const { results, error, loading } = useSelector((state) => state.search);
  const weatherData = results?.weatherList?.data;

  const dailyAverages = {};

  weatherData?.list?.forEach((data) => {
    const date = moment(data.dt_txt).format("YYYY-MM-DD");

    // Kiểm tra xem ngày đã tồn tại trong dailyAverages chưa
    if (!dailyAverages[date]) {
      // Nếu không tồn tại, tạo một mục mới cho ngày đó
      dailyAverages[date] = {
        date: moment(data.dt_txt).format("dddd, D MMMM"),
        temp_sum: 0,
        temp_min_sum: 0,
        temp_max_sum: 0,
        humidity_sum: 0,
        count: 0,
        weather_main: "",
      };
    }

    // Lấy giá trị humidity và weather.main cho ngày đầu tiên
    if (dailyAverages[date].count === 0) {
      dailyAverages[date].humidity_sum = data.main.humidity;
      dailyAverages[date].weather_main = data.weather[0].main;
    }

    // Cộng tổng temp, temp_min, temp_max và humidity
    dailyAverages[date].temp_sum += data.main.temp;
    dailyAverages[date].temp_min_sum += data.main.temp_min;
    dailyAverages[date].temp_max_sum += data.main.temp_max;
    dailyAverages[date].humidity_sum += data.main.humidity;

    // Tăng số lượng bước thời gian
    dailyAverages[date].count++;
  });

  // Tính trung bình temp, temp_min, temp_max và humidity cho mỗi ngày
  Object.keys(dailyAverages).forEach((date) => {
    const count = dailyAverages[date].count;
    dailyAverages[date].temp_avg = Math.round(
      dailyAverages[date].temp_sum / count
    );
    dailyAverages[date].temp_min_avg = Math.round(
      dailyAverages[date].temp_min_sum / count
    );
    dailyAverages[date].temp_max_avg = Math.round(
      dailyAverages[date].temp_max_sum / count
    );
    dailyAverages[date].humidity_avg = Math.round(
      dailyAverages[date].humidity_sum / count
    );
    // Xóa các thuộc tính temp_sum, temp_min_sum, temp_max_sum, humidity_sum để giữ lại chỉ trung bình
    delete dailyAverages[date].temp_sum;
    delete dailyAverages[date].temp_min_sum;
    delete dailyAverages[date].temp_max_sum;
    delete dailyAverages[date].humidity_sum;
  });

  const dailyAveragesArray = Object.values(dailyAverages).map((dateData) => ({
    date: dateData.date,
    temp_avg: dateData.temp_avg,
    temp_min_avg: dateData.temp_min_avg,
    temp_max_avg: dateData.temp_max_avg,
    humidity_avg: dateData.humidity_avg,
    weather_main: dateData.weather_main,
  }));

  return (
    <>
      {error?.response?.status === 404
        ? ''
        : dailyAveragesArray?.length > 0 && (
            <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
              {/* <div className="flex justify-between items-center">
              <span className="font-semibold text-lg w-1/4">Fri, 22 Jan</span>
              <div className="flex items-center justify-end w-1/4 pr-10">
                <span className="font-semibold">12%</span>
                <svg
                  className="w-6 h-6 fill-current ml-1"
                  viewBox="0 0 16 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1,0,0,1,-4,-2)">
                    <path
                      d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                      style={{ fillRule: "nonzero" }}
                    />
                  </g>
                </svg>
              </div>
              <svg
                className="h-8 w-8 fill-current w-1/4"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
              </svg>
              <span className="font-semibold text-lg w-1/4 text-right">
                18° / 32°
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg w-1/4">Sat, 23 Jan</span>
              <div className="flex items-center justify-end pr-10 w-1/4">
                <span className="font-semibold">0%</span>
                <svg
                  className="w-6 h-6 fill-current ml-1"
                  viewBox="0 0 16 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1,0,0,1,-4,-2)">
                    <path
                      d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                      style={{ fillRule: "nonzero" }}
                    />
                  </g>
                </svg>
              </div>
              <svg
                className="h-8 w-8 fill-current w-1/4"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
              </svg>
              <span className="font-semibold text-lg w-1/4 text-right">
                22° / 34°
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg w-1/4">Sun, 24 Jan</span>
              <div className="flex items-center justify-end pr-10 w-1/4">
                <span className="font-semibold">20%</span>
                <svg
                  className="w-6 h-6 fill-current ml-1"
                  viewBox="0 0 16 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1,0,0,1,-4,-2)">
                    <path
                      d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                      style={{ fillRule: "nonzero" }}
                    />
                  </g>
                </svg>
              </div>
              <svg
                className="h-8 w-8 fill-current w-1/4"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
              </svg>
              <span className="font-semibold text-lg w-1/4 text-right">
                21° / 32°
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg w-1/4">Mon, 25 Jan</span>
              <div className="flex items-center justify-end pr-10 w-1/4">
                <span className="font-semibold">50%</span>
                <svg
                  className="w-6 h-6 fill-current ml-1"
                  viewBox="0 0 16 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1,0,0,1,-4,-2)">
                    <path
                      d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                      style={{ fillRule: "nonzero" }}
                    />
                  </g>
                </svg>
              </div>
              <svg
                className="h-8 w-8 fill-current w-1/4"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
              </svg>
              <span className="font-semibold text-lg w-1/4 text-right">
                18° / 29°
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg w-1/4">Tue, 26 Jan</span>
              <div className="flex items-center justify-center w-1/4">
                <span className="font-semibold">80%</span>
                <svg
                  className="w-6 h-6 fill-current ml-1"
                  viewBox="0 0 16 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1,0,0,1,-4,-2)">
                    <path
                      d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                      style={{ fillRule: "nonzero" }}
                    />
                  </g>
                </svg>
              </div>
              <svg
                className="h-8 w-8 fill-current w-1/4"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
              </svg>
              <span className="font-semibold text-lg w-1/4 text-right">
                20° / 29°
              </span>
            </div> */}
              {dailyAveragesArray?.map((el, index) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <span className="font-semibold text-lg w-1/4">
                      {el.date}
                    </span>
                    <div className="flex items-center justify-center w-1/4">
                      <span className="font-semibold">{el.humidity_avg}%</span>
                      <svg
                        className="w-6 h-6 fill-current ml-1"
                        viewBox="0 0 16 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="matrix(1,0,0,1,-4,-2)">
                          <path
                            d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                            style={{ fillRule: "nonzero" }}
                          />
                        </g>
                      </svg>
                    </div>
                    {/* <svg
                    className="h-8 w-8 fill-current w-1/4"
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
                  </svg> */}
                    <div>
                      <span>{el.weather_main}</span>
                    </div>
                    <span className="font-semibold text-lg w-1/4 text-right">
                      {el.temp_min_avg}° / {el.temp_max_avg}°
                    </span>
                  </div>
                );
              })}
            </div>
          )}
    </>
  );
}

export default WeaetherList;
