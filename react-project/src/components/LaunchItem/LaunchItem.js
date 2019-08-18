import React from 'react';
import PropTypes from 'prop-types';

import styles from './launch-item.module.scss';
import { INSPECT_MAX_BYTES } from 'buffer';

/**
 * Launch Item renders all the details of a 
 * given launch
 */
const LaunchItem = (props) => {
 

  if (!props.item) {
    return (
      <div>Your search is not matching. Please try again.</div>
    )
  } 

  const { item: {
    details,
    flight_number,
    launch_site,
    launch_date_local,
    payloads,
    rocket,
    links: {
      mission_patch,
      reddit_campaign,
      reddit_launch,
      reddit_media,
      presskit,
      article_link,
      video_link
    },
  } } = props;
 

  return (
    <div > 
      <article className={styles.launchItem}>
        <div className={styles.patchContainer}>
          <img
            className={styles.patch}
            alt="Mission patch"
            src={mission_patch}
          />
        </div>
        <div className={styles.detailsContainer}>
          <p className={styles.title}>
            {`${rocket.rocket_name} - ${payloads[0].payload_id}`}
          </p>
          <p className={styles.subtitle}>
            {`Launched on ${launch_date_local.slice(0,10)} at ${launch_date_local.slice(11,16)}
             from ${launch_site.site_name}`}
          </p>          

          <div className={styles.links}>
            {reddit_campaign &&
              <a href={reddit_campaign} className={styles.link}>
                Reddit Campaign
              </a>
            }

            {reddit_launch &&
              <a href={reddit_launch} className={styles.link}>
                Reddit Launch
              </a>            
            }
            {reddit_media && 
              <a href={reddit_media} className={styles.link}>
                Reddit Media
              </a>
            }
            {presskit && 
              <a href={presskit} className={styles.link}>
                Press Kit
              </a>
            }
            {article_link &&
              <a href={article_link} className={styles.link}>
                Article
              </a>            
            } 
            {video_link &&
              <a href={video_link} className={styles.link}>
                Watch Video
              </a>
            }

          </div>
        </div>
        <dl className={styles.flightNumber}>
          <dt>Flight Number</dt>
          <dd>#{flight_number}</dd>
        </dl>
      </article>      
    </div>
  )
};

LaunchItem.propTypes = {
  item: PropTypes.shape({
    rocket: PropTypes.shape({
      // name of the rocket used
      rocketName: PropTypes.string,
    }),

    // payload id of rocket
    payloadId: PropTypes.string,

    // the date of launch
    launchDate: PropTypes.string,

    // the launch pad the mission launched from
    launchSiteName: PropTypes.string,

    // flight number of the rocket
    flightNumber: PropTypes.string,

    // whether the mission failed or not defined,
    // as when the launch or landing was not successful
    missionFailed: PropTypes.string,

    // link to the mission patch image
    missionPatchLink: PropTypes.string,

    // link to the reddit campaign
    redditCampaignLink: PropTypes.string,

    // link to the reddit launch thread
    redditLaunchLink: PropTypes.string,

    // link to the reddit media thread
    redditMediaLink: PropTypes.string,

    // link to the press kit page
    pressKitLink: PropTypes.string,

    // link to the launch article page
    articleLink: PropTypes.string,

    // link to video of the mission
    videoLink: PropTypes.string,
  })
}

export default LaunchItem;
