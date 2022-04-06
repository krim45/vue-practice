Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <!-- 속성 바인딩 -->
    <div class="product-image">
      <img v-bind:src="variants[selectedVariant].variantImage" />
      <!-- <img :src="image" /> -->
    </div>

    <div class="product-info">
      <!-- <h1>{{ brand }}{{ product }}</h1> -->
      <h1>{{ title }}</h1>

      <!-- 조건부 렌더링 -->
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>

      <!-- computed porperty -->
      <p>{{ sale }}</p>
      <p>User is premium: {{ premium }}</p>
      <p>Shipping: {{ shipping }}</p>

      <!-- 리스트 렌더링 -->
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>

      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor}"
        @mouseover="updateProduct(index)"
      ></div>

      <!-- 이벤트 핸들링 -->
      <button
        @click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton: !inStock}"
      >
        Add to Cart</button
      ><br />
      <button v-on:click="removeFromCart" style="background-color: red">
        Remove to Cart
      </button>
    </div>
  </div>
  `,
  data() {
    return {
      brand: "Vue Mastery",
      product: "Socks",
      image:
        "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage:
            "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage:
            "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
          variantQuantity: 8,
        },
      ],
      onSale: true,
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
      this.onSale = this.inStock > 0;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " are on sale!";
      }
      return this.brand + " " + this.product + " are not on sale";
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  },
}); 

var app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeCart(id) {
      this.cart = this.cart.filter(v => v !== id);
    }
  }
});
