# Leaflet-Earthquake-Visualization

# Summary

## Part 1: Analyze and Explore the Climate Data

In this section, I conducted a climate analysis and data exploration of a climate database using Python and SQLAlchemy. The provided files `climate_starter.ipynb` and `hawaii.sqlite` were used to complete the analysis.

### Key Tasks

1. **Database Connection and Setup**
   - Used `SQLAlchemy create_engine()` to connect to the SQLite database.
   - Reflected tables into classes using `SQLAlchemy automap_base()`, and saved references to the `station` and `measurement` tables.
   - Linked Python to the database by creating a SQLAlchemy session.

2. **Precipitation Analysis**
   - Found the most recent date in the dataset.
   - Queried the previous 12 months of precipitation data using the most recent date.
   - Loaded the query results into a Pandas DataFrame and sorted by date.
   - Plotted the results using the DataFrame plot method.
   - Printed summary statistics for the precipitation data.

3. **Station Analysis**
   - Designed a query to calculate the total number of stations in the dataset.
   - Identified the most active stations by listing stations and observation counts in descending order.
   - Calculated the lowest, highest, and average temperatures for the most active station.
   - Queried the previous 12 months of temperature observation (TOBS) data for the most active station.
   - Plotted the TOBS data as a histogram with 12 bins.
   - Closed the SQLAlchemy session.

## Part 2: Design the Climate App

After completing the initial analysis, I designed a Flask API based on the queries developed.

### Key Tasks

1. **Flask API Routes**
   - **/**: Listed all available routes.
   - **/api/v1.0/precipitation**: Retrieved the last 12 months of precipitation data, converted it to a dictionary with dates as keys and precipitation as values, and returned the JSON representation.
   - **/api/v1.0/stations**: Returned a JSON list of stations from the dataset.
   - **/api/v1.0/tobs**: Queried dates and temperature observations of the most active station for the previous year and returned a JSON list of temperature observations.
   - **/api/v1.0/<start> and /api/v1.0/<start>/<end>**: Returned a JSON list of the minimum, average, and maximum temperatures for a specified start or start-end range. Calculated TMIN, TAVG, and TMAX for all dates greater than or equal to the start date, and for dates from the start date to the end date, inclusive.

This project demonstrated the use of Python, SQLAlchemy, Pandas, Matplotlib, and Flask to analyze and visualize climate data, and to create a Flask API based on the analysis.
