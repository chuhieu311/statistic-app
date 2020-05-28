import React, { useState } from "react";
import "./App.scss";
import {
  FacebookProvider,
  Login,
  Profile,
  // Status,
  // Page,
  // EmbeddedPost,
  // Feed,
  // LoginButton,
  // Like,
  // Share,
  // Comments,
  // CommentsCount,
  // Initialize,
} from "react-facebook";
import { Grid, Button, Typography, Container } from "@material-ui/core";

import graph from "fbgraph";
import MnPage from "./components/MnPage";

function App() {
  const [data, setData] = useState();

  const handleResponse = data => {
    console.log(data);
    setData(data);
    graph.setAccessToken(data.tokenDetail.accessToken);
  };

  const handleError = error => {
    this.setState({ error });
  };

  return (
    <FacebookProvider appId="357655248542238">
      <div className="App">
        <Container className="App-header">
          {data ? (
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <Profile>
                  {({ loading, profile }) => (
                    <Typography variant="h4" component="p">
                      {Boolean(profile) ? `Welcome ${profile.name}` : "Ahih"}
                    </Typography>
                  )}
                </Profile>
              </Grid>
              <Grid item xs={12}>
                <MnPage accessToken={data.tokenDetail.accessToken} />
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography variant="h4" component="h4">
                Please login before do something!!!!
              </Typography>
              <Login scope="email" onCompleted={handleResponse} onError={handleError}>
                {({ loading, handleClick, error, data }) => (
                  <Button variant="contained" color="primary" onClick={handleClick}>
                    {loading ? "Loading..." : "Custom login FB"}
                  </Button>
                )}
              </Login>
            </>
          )}
        </Container>
      </div>
    </FacebookProvider>
  );
}

export default App;

// const Refer_link = ["https://github.com/seeden/react-facebook", "https://github.com/criso/fbgraph"];
// const CONFIG = {
//   client_id: "1150578331946772",
//   redirect_uri: "http://localhost:3000//",
//   client_secret: "8339a2386452c6ea3845bfb56c932b11",
// };

// const onLoginFb = () => {
//   if (data) {
//     var params = {
//       retailer_id: "retailer_id book",
//       category: "Category Book",
//       currency: "VND",
//       price: "1000",
//       name: "CCCCCCC ahihi",
//       image_file: "https://i.pinimg.com/236x/3b/53/1e/3b531e8ecca95372143b654d3e7e382d.jpg",
//       // url: "http://facebook.com/thanhnt.bi8170",
//       // description: "Ahihi",
//     };

//     let paramsBatchAPI = {
//       requests: [
//         {
//           retailer_id: "book",
//           method: "DELETE",
//           data: {
//             name: "CCCCCCC ahihi",
//             price: "1000",
//             url: "http://facebook.com/thanhnt.bi8170",
//             image_url: "https://i.pinimg.com/236x/3b/53/1e/3b531e8ecca95372143b654d3e7e382d.jpg",
//             currency: "VND",
//             description: "Ahihi",
//           },
//         },
//       ],
//     };

//     // pass it in as part of the url
//     graph.post("/557619748280192/products", params, function (err, res) {
//       // returns the post id
//       console.log(res); // { id: xxxxx}
//     });
//   } else {
//     alert("Please login");
//   }
// };
