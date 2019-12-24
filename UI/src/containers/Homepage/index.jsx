import React from 'react';

// Custom Imports
import Carousel from '../../components/Carousel';
import Card from '../../components/Card';
import NewsAndEvent from '../../components/NewsAndEvent';
import Service from '../../components/Service';

import { colors } from '../../theme';

import data from '../../data/Homepage';

const Cards = [
  {
    id: 1,
    title: 'ABOUT US',
    to: '/aboutus',
  }, {
    id: 2,
    title: 'LOCATION',
    to: '/contact',
  }, {
    id: 3,
    title: 'OUR TEAM',
    to: '/'
  }, {
    id: 4,
    title: 'CONTACT US',
    to: '/contact',
  },
];

// Component for displaying homepage
const Homepage = () => (
  <div className="row app-content" style={{ color: colors.regularGray, background: colors.lightGreen, borderColor: colors.white }}>
    <div className="columns small-2">
      <Carousel />
    </div>
    <div className="columns small-10">
      {data.services.map(({ id,
        title, subtitle,
      }) => (
          <div key={id} className="grid-x content-container" style={{ background: colors.white }}>
            <div className="cell small-12 content" style={{ color: colors.regularGray }}>
              <h5>
                <span style={{ color: colors.green, fontWeight: 'bold' }}>{title.heading}</span>
                {' '}
                <span style={{ color: colors.navyBlue, fontWeight: 'bold' }}>{title.content}</span>
              </h5>
            </div>
          </div>
        ))}
    </div>

    <div className="columns small-2">
      <div className="grid-x">
        <div
          className="cell small-12 content"
          style={{
            background: colors.lightGreen,
            color: colors.green,
            padding: '2% 3%',
          }}
        >
          <h4 style={{ fontWeight: 'bold' }}>News & Events</h4>
        </div>
        <div
          className="cell small-12 content"
          style={{
            background: colors.lightGreen, display: '-webkit-inline-box', padding: '1% 0% 4% 2%', width: '98%',
          }}
        >
          <div className="cell small-12" style={{ background: colors.white, display: '-webkit-inline-box' }}>
            {data.news.map(({ id,
              content, date, link, title,
            }) => (
                <NewsAndEvent key={id} content={content} date={date} link={link} title={title} />
              ))}
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default Homepage;
