export default function calculateCourseDiscount(course) {
  const PERCENTAGE = 100;
  const discountPrice = ((PERCENTAGE - course.discount) / PERCENTAGE) * course.price;
  return course.discount ? `$ ${discountPrice.toFixed(2)}` : 'FREE';
}
