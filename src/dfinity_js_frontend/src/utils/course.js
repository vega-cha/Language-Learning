import { transferICP } from "./ledger";

export async function getCourses() {
  try {
    return await window.canister.course.getCourses();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
export async function getBookings() {
  try {
    return await window.canister.course.getBookings();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getPendings() {
  try {
    return await window.canister.course.getPendings();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getReservationFee() {
  try {
    return await window.canister.course.getReservationFee();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function addCourse(course) {
  const result = await window.canister.course.addCourse(course);

  if (result.Err) {
    let error = Object.entries(result.Err);
    let errorMsg = `${error[0][0]} : ${error[0][1]}`;
    throw new Error(errorMsg);
  }

  return result.Ok;
}

// correct this function
export async function makeReservation(id, noOfCourses) {
  const courseCanister = window.canister.course;
  const orderResponse = await courseCanister.createReservationOrder(
    id,
    noOfCourses
  );
  if (orderResponse.Err) {
    let error = Object.entries(orderResponse.Err);
    let errorMsg = `${error[0][0]} : ${error[0][1]}`;
    throw new Error(errorMsg);
  }
  const canisterAddress = await courseCanister.getCanisterAddress();
  const block = await transferICP(
    canisterAddress,
    orderResponse.Ok.amount,
    orderResponse.Ok.memo
  );
  const result = await courseCanister.completeReservation(
    id,
    noOfCourses,
    block,
    orderResponse.Ok.memo
  );
  if (result.Err) {
    let error = Object.entries(result.Err);
    let errorMsg = `${error[0][0]} : ${error[0][1]}`;
    throw new Error(errorMsg);
  }
  return result.Ok;
}

export async function endReservation(id) {
  const result = await window.canister.course.endReservation(id);
  if (result.Err) {
    let error = Object.entries(result.Err);
    let errorMsg = `${error[0][0]} : ${error[0][1]}`;
    throw new Error(errorMsg);
  }

  return result.Ok;
}

export async function deleteCourse(id) {
  const result = await window.canister.course.deleteCourse(id);
  if (result.Err) {
    let error = Object.entries(result.Err);
    let errorMsg = `${error[0][0]} : ${error[0][1]}`;
    throw new Error(errorMsg);
  }
  return result.Ok;
}
export async function getCourse(id) {
  const result = await window.canister.course.getCourse(id);
  if (result.Err) {
    let error = Object.entries(result.Err);
    let errorMsg = `${error[0][0]} : ${error[0][1]}`;
    throw new Error(errorMsg);
  }
  return result.Ok;
}
