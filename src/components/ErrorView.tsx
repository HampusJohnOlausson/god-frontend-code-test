import React, { FC } from "react";
import { Button, View, Text, Block } from "vcc-ui";

const ErrorView: FC = () => {
  return (
    <div className="errorContainer">
      <Block>
        <Text subStyle={'emphasis'}>Something went wrong! Please try again.</Text>
        <Button size="small" onClick={() => document.location.reload()}>
          Fetch again
        </Button>
      </Block>
    </div>
  );
};

export default ErrorView;
