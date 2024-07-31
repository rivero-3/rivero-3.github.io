document.addEventListener('alpine:init', () => {
   Alpine.data('products', () => ({
      items: [
         { id: 1, name: 'Robusta Brazil', img: 'been 1.jpg', price: 20000 },
         { id: 2, name: 'Arabica Blend', img: 'been 2.jpg', price: 25000 },
         { id: 3, name: 'Primo Passo', img: 'been 3.jpg', price: 30000 },
         { id: 4, name: 'Aceh Gayo', img: 'been 4.jpg', price: 35000 },
         { id: 5, name: 'Sumatra Mandheling', img: 'been 5.jpg', price: 40000 },
      ],
   }));

   Alpine.store('cart', {
      items: [],
      total: 0,
      quantity: 0,
      add(newItem) {
         // cek apakah ada yg sama
         const cartItem = this.items.find((item) => item.id === newItem.id);

         // jika belum
         if (!cartItem) {
            this.items.push({ ...newItem, quantity: 1, total: newItem.price });
            this.quantity++;
            this.total += newItem.price;
         } else {
            // jika ada, apakah beda atau sama
            this.items = this.items.map((item) => {
               // jika baran beda
               if (item.id !== newItem.id) {
                  return item;
               } else {
                  // jika ada,tambah jumlah dan total
                  item.quantity++;
                  item.total = item.price * item.quantity;
                  this.quantity++;
                  this.total += item.price;
                  return item;
               }
            })
         }
      },
      remove(id) {
         // ambil yg mau diremove
         const cartItem = this.items.find((item) => item.id === id);

         // jika lebih dri 1
         if (cartItem.quantity > 1) {
            // telusuri 1 1
            this.items = this.items.map((item) => {
               // jika tidak sama
               if (item.id !== id) {
                  return item;
               } else {
                  item.quantity--;
                  item.total = item.price * item.quantity;
                  this.quantity--;
                  this.total -= item.price;
                  return item;
               }
            })
         } else if (cartItem.quantity === 1) {
            // jika sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
         }
      }
   });
});


// konfersi rupiah
const rupiah = (number) => {
   return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
   }).format(number);
};