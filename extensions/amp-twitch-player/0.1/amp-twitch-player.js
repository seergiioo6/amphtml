/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Layout} from '../../../src/layout';
import {isLayoutSizeDefined} from '../../../src/layout';
import {userAssert} from '../../../src/log';

export class AmpTwitchPlayer extends AMP.BaseElement {

  /** @param {!AmpElement} element */
  constructor(element) {
    super(element);

    /** @private {?Element} */
    this.videoId_ = null;

    /** @private {string} */
    this.frameborder_ = '';

    /** @private {string} */
    this.width_ = '300';

    /** @private {string} */
    this.height_ = '250';

    /** @private {string} */
    this.allowFullScreen_ = '';
  }

  /** @override */
  createPlaceholderCallback() {
    const placeholder = this.win.document.createElement('iframe');
    this.height_ = userAssert(
        this.element.getAttribute('height'),
        'The height attribute is required'
    );
    this.width_ = userAssert(
        this.element.getAttribute('width'),
        'The width attribute is required'
    );
    this.videoId_ = userAssert(
        this.element.getAttribute('videoId'),
        'The videoId attribute is required'
    );
    this.frameborder_ = userAssert(
        this.element.getAttribute('frameborder'),
        'The frameborder attribute is required'
    );
    this.allowFullScreen_ = userAssert(
        this.element.getAttribute('allowFullScreen'),
        'The allowFullScreen attribute is required'
    );
    // placeholder.setAttribute('layout', 'responsive');
    placeholder.setAttribute('frameborder', this.frameborder_);
    placeholder.setAttribute('layout', 'responsive');
    placeholder.setAttribute('allowFullScreen', this.allowFullScreen_);
    placeholder.setAttribute('height', this.height_);
    placeholder.setAttribute('width', this.width_);
    placeholder.setAttribute('src', `https://player.twitch.tv/?video=v${this.videoId_}&autoplay=true`);
    return placeholder;
  }

  /** @override */
  isLayoutSupported(layout) {
    return isLayoutSizeDefined(layout);
  }
}

AMP.extension('amp-twitch-player', '0.1', AMP => {
  AMP.registerElement('amp-twitch-player', AmpTwitchPlayer);
});