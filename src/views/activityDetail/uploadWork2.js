import React from 'react';
import {Button, Card, CardContent, Typography} from "@material-ui/core";


class UploadWork2 extends React.Component {
  render() {
    return (
      <Card>
        <Typography
          variant={"h3"}
        >
          Your Work
        </Typography>
        <CardContent>
          <form onSubmit={}>
            <input
              type="file"

            />


            <Button
              type={"submit"}
            >
              Submit
            </Button>
          </form>

        </CardContent>
      </Card>
    )
  }
}

export default UploadWork2;
