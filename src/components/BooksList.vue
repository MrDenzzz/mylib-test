<template>
  <div class="container">
    <div class="book" v-for="(book, index) in books" :key="index">
      <img class="cover" :src="`http://my-lib.ru${book.work.cover}`" />
      <h5 class="title">{{ book.work.title }}</h5>
      <span class="author">{{ book.work.authors_titles }}</span>
      <div class="rating">
        <div class="star"></div>
        {{ book.work.rating.score }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookslist-component',
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style lang="scss">
  .container {
    max-width: 960px;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
  }
  .book {
    height: 350px;
    width: 220px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .cover {
      height: 60%;
      width: 100%;
      object-fit: contain;
      margin-bottom: 8px;
    }
    .title {
      font-size: 15px;
      margin: 8px auto;
      color: #17131d;
    }
    .author {
      font-size: 13px;
      color: #9a9a9a;
    }
    .rating {
      display: flex;
      padding: 8px 0;
      font-size: 15px;
      color: #122f2f;
      .star {
        margin: 5px 5px 5px 0;
        position: relative;
        display: block;
        width: 0px;
        height: 0px;
        border-right: 10px solid transparent;
        border-bottom: 7px  solid #f27401;
        border-left: 10px solid transparent;
        transform: rotate(35deg);
        &:before {
          border-bottom: 8px solid #f27401;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          position: absolute;
          height: 0;
          width: 0;
          top: -4.5px;
          left: -6.5px;
          display: block;
          content: '';
          transform: rotate(-35deg);
        }
        &:after {
          position: absolute;
          display: block;
          color: #f27401;
          left: -10.5px;
          width: 0px;
          height: 0px;
          border-right: 10px solid transparent;
          border-bottom: 7px solid #f27401;
          border-left: 10px solid transparent;
          transform: rotate(-70deg);
          content: '';
        }
      }
    }
  }
</style>
