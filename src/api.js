class APIService {
 async getCountyData() {
    console.log("Fetchin counties");
    try {
      let requstBody = {
        CreatedBy: "onWatts",
      };

      const response = await Promise.race([
        fetch('https://jaylohokare-battery-api-976g4pw5p9rfx7qr-5000.githubpreview.dev/getCounties', {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : 'HEAD, GET, POST, PUT, PATCH, DELETE',
            "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token',
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify(requstBody),
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
    }
    return null;
  }
}
export let apiService = new APIService();