import React, { Component } from 'react';
import { Icon, Progress } from 'antd';
import imgHuntPlatform from 'assets/images/wallet/img-hunt-platform@2x.png';
import { formatNumber, formatFloat } from "utils/helpers/steemitHelpers";
import api from 'utils/api';

const BarProgress = ({ data, label, disabled, max }) => {
  return (
    <div className={`bar-progress ${disabled && 'disabled'}`}>
      <span className="progress-text">{label} : {formatNumber(data)}</span>
      <Progress percent={formatFloat(data/max*100)} showInfo={false} />
    </div>
  )
}

export default class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record_time: 0,
      total: 0,
      days_passed: 0,
      airdrops: {}
    }
  }

  componentDidMount() {
    api.get('/hunt_transactions/stats.json').then((res) => {
      this.setState(res);
    })
  }

  renderStatus() {
    const { total, days_passed, airdrops } = this.state;
    const airdropKeys = Object.keys(airdrops);

    return (
      <div className="inner-block">
        <div className="round-progress">
          <Progress type="circle" percent={formatFloat(total / 250000000 * 100)} />
          <span className="progress-text">{formatNumber(total)}<br/>HUNT tokens</span>
        </div>
        <div className="round-progress">
          <Progress type="circle" percent={formatFloat(days_passed / 365 * 100)} format={(d) => `${days_passed} days`} />
          <span className="progress-text">SMT ver release<br/>on May 21st, 2019</span>
        </div>
        {airdropKeys.map((key, i) => {
          const { data, label, disabled } = airdrops[key];
          return <BarProgress key={i} data={data} label={label} disabled={disabled} max={airdrops[airdropKeys[0]].data} />;
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="contents-page">
        <div className="page-block">
          <h1>50% Airdrop to<br/>Focus on Product/<br/>Community Building</h1>
          <div className="thin">
            HUNT token airdrop was initiated on May 22nd, 2018.
            It has been assigned 50% of the total tokens.
            This airdrop will run until the SMT (Smart Media Token) system is launched (2Q of 2019).
            The ERC20 will be issued first and then swapped with HUNT tokens when SMT is ready.
            The HUNT token airdrop strategy is designed to gather as many product influencers as possible and amplify our community activities.
          </div>
        </div>
        <div className="page-block">
          <h2 className="bottom-line">Airdrop Status</h2>
          <div className="thin">as of {this.state.record_time}</div>
          <div className="thin">{this.renderStatus()}</div>
        </div>
        <div className="page-block">
          <h1 className="margin-top">What is HUNT<br/>Platform?</h1>
          <div className="thin">
            HUNT is an incentivising community platform on top of Steem Blockchain for product influencers who have exceptional knowledge and passion for cool new products.
            It’s a bridging platform for makers to reach out to early adopters for the successful launch of their product.

            <a href="https://token.steemhunt.com/" className="action less-margin" target="_blank" rel="noopener noreferrer">
              Learn more <Icon type="right-circle-o" />
            </a>
          </div>
          <img src={imgHuntPlatform} alt="HUNT Platform" className="image hunt-platform" />
        </div>
      </div>
    );
  }
}
