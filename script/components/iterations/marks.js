const container = document.getElementById('marks-container');

const marks = [
  { id: 1, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Lada_2021_logo.svg/120px-Lada_2021_logo.svg.png", mark: "Lada", country: "Russia", founded: 1966 },
  { id: 2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Toyota.svg/120px-Toyota.svg.png", mark: "Toyota", country: "Japan", founded: 1937 },
  { id: 3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/120px-BMW.svg.png", mark: "BMW", country: "Germany", founded: 1916 },
  { id: 4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mercedes-Benz_logo.svg/120px-Mercedes-Benz_logo.svg.png", mark: "Mercedes-Benz", country: "Germany", founded: 1926 },
  { id: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Formula_One_logo.svg/120px-Formula_One_logo.svg.png", mark: "Ferrari", country: "Italy", founded: 1947 },
  { id: 6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Porsche_Logo.svg/120px-Porsche_Logo.svg.png", mark: "Porsche", country: "Germany", founded: 1931 },
  { id: 7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Lamborghini_Logo.svg/120px-Lamborghini_Logo.svg.png", mark: "Lamborghini", country: "Italy", founded: 1963 },
  { id: 8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Audi_Logo.svg/120px-Audi_Logo.svg.png", mark: "Audi", country: "Germany", founded: 1909 },
  { id: 9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Hyundai_logo.svg/120px-Hyundai_logo.svg.png", mark: "Hyundai", country: "South Korea", founded: 1967 },
  { id: 10, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ford_Motor_Company_Logo.svg/120px-Ford_Motor_Company_Logo.svg.png", mark: "Ford", country: "USA", founded: 1903 },
  { id: 11, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Volkswagen_logo_2019.svg/120px-Volkswagen_logo_2019.svg.png", mark: "Volkswagen", country: "Germany", founded: 1937 },
  { id: 12, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Honda_logo.svg/120px-Honda_logo.svg.png", mark: "Honda", country: "Japan", founded: 1948 }
];

container.innerHTML = '';

marks.forEach(mark => {
    const markElement = document.createElement('a');
    markElement.className = "px-[30px] py-[20px] flex items-center space-x-[28px] rounded-[12px] bg-[#DDDFE752] cursor-pointer";
    markElement.href = `/mark/${mark.id}`;
    markElement.innerHTML = `
    <img src="${mark.img}" alt="${mark.mark}" class="w-10 h-10 object-contain">
    <span class="text-lg font-semibold">${mark.mark}</span>
  `;
    container.appendChild(markElement);
});