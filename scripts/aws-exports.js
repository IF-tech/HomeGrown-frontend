// src/aws-exports.js
const awsConfig = {
   Auth: {
      Cognito: {
         region: "us-west-2", // Replace with your AWS region
         userPoolId: "us-west-2_YExRVLcSz", // Replace with your User Pool ID
         userPoolClientId: "6363qjo5gjhjumnnt3p9m96vgv", // Replace with your App Client ID
         identityPoolId: "us-west-2:42d286bc-1c3e-479b-9ffc-fade9edbfabb", // Replace with your Identity Pool ID
         loginWith: {
            email: true,
            username: true,
            phone: false,
            oauth: {
               domain: "us-west-2yexrvlcsz.auth.us-west-2.amazoncognito.com", // Replace with your Cognito Domain
               scopes: ["email", "openid", "profile"],
               // Fixed redirect URLs for mobile platforms
               redirectSignIn: [
                  "myapp://", // Mobile deep link (Expo)
                  "http://localhost:8081/", // Web redirect (for debugging)
                  "exp://127.0.0.1:8081/", // Expo development URL
                  "exp://192.168.1.253:8081/", // Your specific Expo IP address
               ],
               redirectSignOut: [
                  "myapp://",
                  "http://localhost:8081/",
                  "exp://127.0.0.1:8081/",
                  "exp://192.168.1.253:8081/",
               ],
               responseType: "code", // Using authorization code grant flow
            },
         },
      },
   },
   // Add additional configuration for better client-side error handling
   Analytics: {
      disabled: false, // Enable to track authentication issues
   },
  

};

export default awsConfig;