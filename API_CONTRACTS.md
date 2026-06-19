# API Contracts

Last updated: 19 June 2026

## `POST /api/contact`

Sends a service enquiry to the configured business email address through Resend.

### Request Headers

- `Accept: application/json`
- `Content-Type: application/json`

### Request Body

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+441234567890",
  "service": "Domestic Cleaning",
  "location": "Chester",
  "message": "Please contact me about this service.",
  "company": "",
  "turnstileToken": ""
}
```

### Required Fields

- `name`
- `email`
- `service`
- `message`

### Bot Protection

- `company` is a honeypot field. If it contains a value, the submission is rejected.
- `turnstileToken` is required only when `TURNSTILE_SECRET_KEY` is configured.

### Success Response

```json
{
  "message": "Thank you. Your enquiry has been sent."
}
```

### Error Responses

- `400`: invalid input or failed spam check
- `403`: invalid origin
- `405`: method not allowed
- `429`: too many attempts
- `500`: email service or server error

## `GET /api/area-check`

Checks whether a postcode, postcode district, or recognised local area appears to be inside the current Chester service area.

### Query Parameters

- `postcode`: required. A full UK postcode, postcode district, or known local area.
- `service`: optional. Used to make the response message clearer.

### Example Request

```text
/api/area-check?postcode=CH1%202HJ&service=Domestic%20Cleaning
```

### Success Response

```json
{
  "status": "covered",
  "location": "CH1 2HJ",
  "distanceMiles": 0,
  "message": "CH1 2HJ appears to be within the current service area for domestic cleaning. Please send the full enquiry so availability can be confirmed. Distance from Chester is about 0 miles."
}
```

### Status Values

- `covered`: likely within the current service area
- `review`: close to the service edge and should be checked manually
- `outside`: outside the current service area
- `error`: invalid input or unavailable checker

### Error Responses

- `400`: invalid postcode or area
- `403`: invalid origin
- `405`: method not allowed
- `429`: too many checks
- `503`: postcode checker unavailable

