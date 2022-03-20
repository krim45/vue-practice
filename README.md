# vue-practice in Vue Mastery

```html
<!-- 속성 바인딩 -->
<div class="product-image">
  <img v-bind:src="image" />
  <img :src="image" />
  <!-- v-bind:는 :로 생략 가능 -->
</div>

<!-- 조건부 렌더링 -->
<p v-if="inStock">In Stock</p>
<p v-else>Out of Stock</p>

<!-- 리스트 렌더링 -->
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>

<div v-for="variant in variants" :key="variant.variantId">
  <p @mouseover="updateProduct(variant.variantImage)">
    {{ variant.variantColor }}
  </p>
</div>

<!-- 이벤트 핸들링 -->
<button @click="addToCart">Add to Cart</button><br />
<button v-on:click="removeToCart" style="background-color: red">
  Remove to Cart
</button>
```

```js
var app = new Vue({
  el: '#app', // DOM 선택자
  data: {
    // 속성(key: value), app.product로 접근
    product: 'Socks',
    image: 'url',
    inStock: false,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage:
          'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage:
          'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
      },
    ],
    cart: 0,
  },
  methods: {
    // 메서드 app.addToCart 로 접근, 메서드 안 this는 해당 Vue 인스턴스를 가르킨다. 즉 app
    // 표현 방법 1 (2와 동일)
    addToCart() {
      this.cart += 1;
    },
    // 표현 방법 2 (1과 동일)
    addToCart: function () {
      this.cart += 1;
    },
    removeToCart() {
      this.cart -= 1;
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    },
  },
});
```
