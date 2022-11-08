import { Component } from 'react';
import { fetchImages } from '../api';
import { Container } from 'components/App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    totalImages: 0,
    gallery: [],
    largeImageURL: null,
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, gallery } = this.state;

    if (prevState.query !== query) {
      // this.setState({ isLoading: true });
      try {
        this.setState({ isLoading: true, gallery: [] });

        const response = await fetchImages(query, page);
        const totalImages = response.total;
        const gallery = response.hits;
        // console.log(gallery);
        // console.log(gallery.length);
        // console.log(totalImages);
        this.setState({ gallery, totalImages });
      } catch {
        // console.log(error);
        // this.setState({ error: 'Failed to load gallary :(' });
        toast.error('Failed to load gallary, please reload the page');
      } finally {
        this.setState({ isLoading: false });
      }
      return;
    }

    if (prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        if (prevState.totalImages !== gallery.length) {
          const response = await fetchImages(query, page);
          const gallery = response.hits;
          // console.log(gallery);
          this.setState({ gallery: [...prevState.gallery, ...gallery] });
        } else return toast.warning('No more images to load');
      } catch {
        toast.error('Failed to load more images, please try again');
      } finally {
        this.setState({ isLoading: false });
      }
      return;
    }
  }

  querySubmit = query => {
    this.setState({ query, page: 1 });
  };

  setLargeImageURL = largeImageURL => {
    this.setState({ largeImageURL });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { gallery, largeImageURL, query, isLoading } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.querySubmit} />
        <ImageGallery
          gallery={gallery}
          query={query}
          onClick={this.setLargeImageURL}
        />
        {isLoading && <Loader />}
        {gallery.length > 0 && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={3000} />
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </Container>
    );
  }
}
