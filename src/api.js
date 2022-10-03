class APIService {
 async getCountyData() {
    console.log("Fetchin counties");
    try {
      let requstBody = {
        CreatedBy: "onWatts",
      };

      const response = await Promise.race([
        fetch('https://jaylohokare-battery-viz-g4xvwg6rjv7fwrpg-5000.githubpreview.dev/getCounties', {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requstBody),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 20000)
        ),
      ]);

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {

      console.log("Unable to fetch counties");
      console.log(error);
      
      // var data = JSON.parse('./dummyData/counties.json');
      let data = require('./dummyData/counties.json');
      console.log("dummy data")
      console.log(data)
      return data
    }
    return null;
  }
}
export let apiService = new APIService();