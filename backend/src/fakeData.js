import Post from './models/post';

export default function fakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `Post #${i}`,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, urna id faucibus pulvinar, quam mauris porta ex, quis feugiat leo orci quis lacus. Sed dapibus diam sed porttitor efficitur. Quisque dolor dui, vulputate vel est eu, commodo rhoncus nisi. Pellentesque auctor ut nibh ac elementum. Proin dictum, dui id porta efficitur, dolor velit pellentesque nisi, id interdum neque lorem quis mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse pulvinar maximus quam, nec ultricies odio aliquam quis. Curabitur ipsum erat, rhoncus vel dictum non, venenatis sit amet enim. Maecenas faucibus sagittis dolor quis viverra. Sed dictum ligula vel arcu hendrerit imperdiet. Suspendisse ultricies gravida consectetur. Donec libero orci, volutpat vel commodo vel, eleifend at libero. Mauris at purus nibh.',
    tags: ['tag1', 'tag20'],
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}
