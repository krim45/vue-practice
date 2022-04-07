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

      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">These are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>Review: {{ review.review }}</p>
          </li>
        </ul>
      </div>

      <product-review @review-submitted="addReview"></product-review>
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
      reviews: []
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
    addReview(productReview) {
      this.reviews.push(productReview)
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    // image() {
    //   return this.variants[this.selectedVariant].variantImage;
    // },
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

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>
      
    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </p>

    <p>
      <p>Would you recommend this product?</p>
      <label>
        Yes
        <input type="radio" value="Yes" v-model="recommend">
      </label>
      
      <label>
        No
        <input type="radio" value="No" v-model="recommend">
      </label>
    </p>

    <p>
      <input type="submit" value="Submit">
    </p>

  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      }
      else {
        if(!this.name) this.errors.push('Name required');
        if(!this.rating) this.errors.push('Rating required');
        if(!this.review) this.errors.push('Review required');
        if(!this.recommend) this.errors.push('Recommendation required');
      }
    },
  }
})

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
