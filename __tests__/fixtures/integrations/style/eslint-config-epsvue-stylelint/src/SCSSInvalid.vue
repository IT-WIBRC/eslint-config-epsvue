<template>
  <div class="example">
    <p>SCSS Invalid Example</p>
  </div>
</template>
  
  <style lang="scss">
  .example {
    color: #fff;
    .nested {
      color: #000;
      margin: 0px; // This violates shorthand-property-no-redundant-values
      &:hover {
        background-color: hsl(0, 0%, 50%); // This might violate lightness-notation if configured
      }
    }
  }
  </style>