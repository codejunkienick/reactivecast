import React, {Component, PropTypes} from 'react';
import {
  FlatButton,
  IconMenu,
  FloatingActionButton
} from 'material-ui/lib/index';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { PlayButton } from 'components';

export default class Logo extends Component {
  static propTypes = {
    dialog: PropTypes.object,
    handlePlay: PropTypes.func,
    isPlaying: PropTypes.bool,
    currentTrack: PropTypes.string
  }
  componentDidMount() {
    const injectTapEventPlugin = require('react-tap-event-plugin');
    injectTapEventPlugin(); // hack for material-ui, until material-ui 1.0
  }
  render() {
    const styles = require('./DesktopPlayer.scss');

    const button = (
      <div className={styles.play}>
        <PlayButton ref="playButton" />
      </div>
    );

    const { isPlaying, handlePlay, currentTrack, dialog } = this.props;

    return (
      <div className={styles.player}>
        <div className={styles.song}>
          {currentTrack}
        </div>
        <div className={styles.controls}>
          <FlatButton rippleColor="#ffffff" backgroundColor="transparent" className={styles.like} href="#">Да</FlatButton>
          <a href="#" onClick={() => dialog.show()} className={styles.controlLabel}>Нравится песня?</a>
          <FlatButton rippleColor="#ffffff" backgroundColor="transparent" className={styles.dislike} href="#">Нет</FlatButton>
        </div>
        <div style={{

          width: '76px',
          height: '76px',
          position: 'absolute',
          left: '50%',
          right: '50%',
          bottom: '-38px',
          marginLeft: '-38px',
        }}>
        { !isPlaying &&
        <IconMenu
          iconButtonElement={button} width="120px" >
          <MenuItem primaryText="128 kb/s" onClick={() => {handlePlay();}}/>
          <MenuItem primaryText="Скачать m3u" />
        </IconMenu>
        }
        { isPlaying &&
          <div onClick={() => handlePlay()} className={styles.play}>
            <FloatingActionButton backgroundColor="#0097a7" style={{width: '76px', height: '76px'}}>
              <span style={{width: '76px', height: '76px', lineHeight: '76px'}}>
                <svg style={{width: '38px', marginTop: '19px'}} viewBox="0 0 24 24">
                  <path fill="#FFFFFF" d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z" />
                </svg>
              </span>
            </FloatingActionButton>
          </div>
        }

      </div>
    </div>
    );
  }
}