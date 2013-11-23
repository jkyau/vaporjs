CONTEXT
====

// Return contextual information
curl -i -X GET http://54.235.66.238:8080/v1/api/context/?lat=37.7776274&lon=-122.3943666  
http://54.235.66.238:8080/v1/api/context/vehicle?lat=37.7776274&lon=-122.3943666  
http://54.235.66.238:8080/v1/api/context/venue?lat=37.7776274&lon=-122.3943666  
http://54.235.66.238:8080/v1/api/context/home?lat=37.7776274&lon=-122.3943666  

DEVICE
====
curl -i -X GET http://54.235.66.238:8080/v1/api/device/search/?q=1234567  
curl -i -X POST -H 'Content-Type: application/json' -d '{"udid": "1234", "home": "260 king st. San Francisco"}' http://54.235.66.238:8080/v1/api/device  
curl -i -X DELETE http://54.235.66.238:8080/v1/api/device/5143bdfc5ccbff781c000001  
curl -i -X GET http://54.235.66.238:8080/v1/api/device  
curl -i -X PUT -H 'Content-Type: application/json' -d '{"udid": "1234", "home": "260 king st. San Francisco"}' http://54.235.66.238:8080/v1/api/device/5143bd2214f420711c000001  
