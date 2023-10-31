This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page. It will contain links to take you either to the User Session page or the Admin page.

## The app

On the User Session page, you can start, retrieve, or end an active parking session for a vehicle.

- Enter a phone number and license plate. This will call an API that will check firestore for an active session for that license plate. If one exists, it will be returned. Otherwise, a new session will be added to firestore and returned. This prevents multiple sessions for one license plate. Session data consists of:

  ```
  {
    licensePlate,
    phoneNumber,
    startTime,
    endTime
  }
  ```

- A session is considered active if `endTime` is null. I didn't add an extra `active` field to ensure a since source of truth for this.
  - Phone number (10 digits, numeric) and license plate (1-8 characters, alphanumeric) will be validated upon submission.
  - Once session data is returned, it is displayed to the user, along with a button to end the session. Clicking the button will call an API that will update the `endTime` field of the associated firestore document to the current time, making it inactive.

On the Admin page, you can see a data grid of all parking sessions that updates in real-time.

- This uses firestore's `onSnapshot` to subscribe to changes in the "parking_sessions" collection (i.e. users creating and ending sessions).
  - This connects directly from the client-side.
- The grid is sorted by `startTime` by default, but all columns can be sorted.
- Grid data can be exported to CSV.

## TODO

With more time, I would work on the following:

- Improve styling (the focus was functionality, so this could really use some love)
- Look into class-validator library
- Add tests
- Improved user UX
  - "Login" with phone number
  - Add multiple cars to my account
  - Allow each car to have an active parking session
- Accessibility check
- Real authentication
- Deploy to firebase
