
# Enview BE - IOT Device 

This Repository Demonstrates Event Schedulers for an automated IOT device that checks for Rash Driving of the Vehicle and Alerts the same.

## For Local Development

    1. Clone this Repository

    2. `yarn` or `npm install` - Install all the dependencies
    
    3. `yarn dev` or `npm run dev` - Start the development server

    4. Please use an API Client Like Postman to test all the APIs

Postman Link : 
  https://app.getpostman.com/join-team?invite_code=816b7bb0bf9d63e81a43391b91e47593&target_code=f32d201d85aa06f6f5f54ceb8270df48

  





## API Reference

#### Post the Event from the IOT Device

URL : http://localhost:3001/event

```http
  POST /event
```
raw - json 

    {
        "vehicle_id" : "KA05LC77XX",
        "is_driving_safe" : "false",
        "location_type" : "highway"
    }

#### Get alert

```http
  GET /alert/:alertId
```

| Parameter | Type     | Description                       | Example |
| :-------- | :------- | :-------------------------------- | ------ |
| `alertId`      | `string` | **Required**. alertId of the Alert to query the details | alertlCjBfCn8VmJr |

#### Get alert

```http
  GET /event/all/:locationType
```

| Parameter | Type     | Description                       |  Example |
| :-------- | :------- | :-------------------------------- | ------ |
| `alertId`      | `string` | **Required**. locationType of the Event to query the details | residential or highway or city_center |



## Demo

https://youtu.be/wHO-2FptjBA