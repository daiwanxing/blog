<script setup></script>

<template>
   <div class="page">
      <header>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            iure ut animi vero a, inventore dolorem in assumenda maxime est
            eaque vel aspernatur aliquam porro explicabo tenetur vitae ab quis.
         </p>
      </header>
      <main>
         <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
            eaque doloremque accusamus molestiae delectus facilis eius, ipsam
            ratione quibusdam quos, dolor ullam. Non quia, saepe doloremque
            facere quaerat adipisci mollitia!
         </p>
      </main>
      <footer>
         <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            praesentium ea earum, autem similique deleniti repudiandae ad quae
            eligendi, atque quaerat in quis maxime minima commodi? Aperiam
            deserunt voluptatibus porro.
         </p>
      </footer>
   </div>
</template>

<style>
.page :is(header, main, footer) p {
   font-size: 1em;
   padding: 0.2em;
   border-radius: 3px;
   color-scheme: light dark;
   background-color: rgb(174, 97, 97);
}
</style>
