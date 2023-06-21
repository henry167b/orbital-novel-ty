import React, {useEffect, useState} from "react";
import axios from "axios";
import cheerio from 'cheerio';

//usage of module
export const [events,setEvents] = useState([]);

export const scrapeEvents = async () => {
    try {
      const url = 'https://www.nlb.gov.sg/main/home';
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
  
      const eventsData = [];
  
      // Find the events within the specified section
      $('#whatsHappeningEvent .event-listing').each((index, element) => {
        const title = $(element).find('.event-title').text().trim();
        const date = $(element).find('.event-date').text().trim();
        const time = $(element).find('.event-time').text().trim();
        const location = $(element).find('.event-location').text().trim();
  
        eventsData.push({ title, date, time, location });
      });
  
      setEvents(eventsData);
    } catch (error) {
      console.error('Error scraping events:', error);
    }
  };
  
  useEffect(() => {
    scrapeEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h2>{event.title}</h2>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
  