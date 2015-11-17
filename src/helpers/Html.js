import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  }
  ym() {
      return (
        "<script src='https://mc.yandex.ru/metrika/watch.js' type='text/javascript'></script>\
        <script type='text/javascript'>\
              try {\
                    var yaCounter33334258 = new Ya.Metrika({\
                    id:33334258,\
                    clickmap:true,\
                    trackLinks:true,\
                    accurateTrackBounce:true,\
                    webvisor:true,\
                    trackHash:true\
                    });\
              } catch(e) { }\
        </script>"
      );
    }

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html lang="en-us">
        <head>
          {DocumentMeta.renderAsReact()}

          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="HandheldFriendly" content="True" />

          <meta name="MobileOptimized" content="320" />

          <meta name="viewport" content="width=device-width, initial-scale=1"/>

          <link rel="image_src" href="http://radiohse.com/logo.jpg" />

          <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'/>

          <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400italic,500&subset=latin,cyrillic' rel='stylesheet' type='text/css'/>

          <link href='/foundation.css' rel='stylesheet' type='text/css'/>

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
