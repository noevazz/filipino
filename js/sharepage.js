function socialMediaShare(net) {
  const url = encodeURIComponent("http://noevazz.github.io/filipino");
  let shareUrl = "";
  
  switch (net) {
      case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
      case 'x':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Learn%20filipino!%20`;
          break;
      case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
  }
  window.open(shareUrl, '_blank');
}