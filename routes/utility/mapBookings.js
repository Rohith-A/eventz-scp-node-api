export const mapBookings = (userName, bookings) => {
    const userBookings = bookings.filter(v => v.userName === userName);
    return userBookings;
}
