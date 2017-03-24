import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
import { autobind } from 'core-decorators';
import { inject } from 'mobx-react';
import {
  CardFooter,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import VKontakte from 'react-icons/lib/fa/vk';
import Odnoklassniki from 'react-icons/lib/fa/odnoklassniki';
import Facebook from 'react-icons/lib/fa/facebook';
import Twitter from 'react-icons/lib/fa/twitter';
import Twitch from 'react-icons/lib/fa/twitch';
import Youtube from 'react-icons/lib/fa/youtube-play';
import Instagram from 'react-icons/lib/fa/instagram';

import _ from 'lodash';

const passportButtons = {
  vkontakte: {
    icon: <VKontakte />,
    color: '#fff000',
  },
  odnoklassniki: {
    icon: <Odnoklassniki />,
  },
  facebook: {
    icon: <Facebook />,
  },
  twitter: {
    icon: <Twitter />,
  },
  twitch: {
    icon: <Twitch />,
  },
  youtube: {
    icon: <Youtube />,
  },
  instagram: {
    icon: <Instagram />,
  },
  youtube: {
    icon: <Youtube />,
  },
};
@inject('auth', 'config')
@importcss(require('./AuthPage.css'))
export default class SocialButtons extends Component {
  render() {
    const { auth, config } = this.props;
    const socials = _.get(config, 'auth.socials', []);
    return (
      <ButtonGroup>
        {_.map(passportButtons, (value, name) => (
          <If condition={socials.indexOf(name) >= 0}>
            <Button
              key={name}
              styleName={`btn-social is-${name}`}
              onClick={() => auth.authPassport(name)}
            >
              {value.icon}
            </Button>
          </If>
        ))}
      </ButtonGroup>
    );
  }
}
SocialButtons.propTypes = {
  auth: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};