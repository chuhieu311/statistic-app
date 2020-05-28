import React from "react";
import { Typography, Table, TableHead, TableCell, TableBody, TableRow, Paper } from "@material-ui/core/";
import graph from "fbgraph";

export default class MnPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: {} };
  }

  componentDidMount() {
    this.getPages();
    let self = this;
  }

  getPages = () => {
    const { accessToken } = this.props;
    if (accessToken) {
      let self = this;
      graph.setAccessToken(accessToken);
      graph.get(
        "me/accounts?fields=name,access_token,category,product_catalogs{product_sets{product_count,products{name,price},name}}",
        {},
        function (err, res) {
          console.log("API calling", res);
          self.setState({ account: res });
        },
      );
    } else {
      alert("Please login");
    }
  };

  render() {
    const {
      account: { data },
    } = this.state;
    console.log("Data", data);
    return (
      <Paper>
        <Table className="cs-table" aria-label="pages table">
          <TableHead className="tb-head">
            <TableRow>
              {TABLE_HEAD.map((headItem, index) => (
                <TableCell key={`head-${index}`} className="tb-cell">
                  <Typography variant="h5" color="inherit">
                    {headItem}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="tb-body">
            {data &&
              data.map(row => (
                <TableRow key={row.id} className="tb-row">
                  <TableCell className="tb-cell">
                    <Typography variant="body1">
                      <b>{row.name}</b>
                    </Typography>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Typography variant="body1">{row.category}</Typography>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Typography variant="body1">{row.access_token}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

MnPage.propTypes = {};
MnPage.defaultProps = {};

const TABLE_HEAD = ["Name", "Category", "Access token"];
