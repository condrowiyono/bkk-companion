import React from 'react';
import {WebView} from 'react-native-webview';
import {ActivityIndicator} from 'react-native';

const Info = () => {
  return (
    <WebView
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator
          style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
          size="large"
        />
      )}
      nestedScrollEnabled
      source={{uri: 'https://www.bukaka.com/'}}
    />
  );
};

export default Info;
