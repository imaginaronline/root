
import SpotLightEvent from '../../components/SpotlightEventComponent';
import ContributionsComponent from '../../components/ContributionComponent';
import MakeImpactComponent from '../../components/MakeImpactsComponent';
import DevineBlessingComponent from '../../components/DevineBlessingComponents';
import LiveStreamingComponent from '../../components/LiveStreamingComponent';
import Footer from '../layout/Footer';

function Home() {

    return (
        <>
            <div className='container pt-5'>
                <section className=''>
                    <h3 className='pb-3'>Your Engagements {">>"}</h3>
                    <div>
                        <ContributionsComponent />
                    </div>
                </section>

                <section className='pt-5'>
                    <h3 className='pt-5 pb-3'>Spotlight Events {">>"} </h3>
                    <SpotLightEvent />
                </section>

                <section className=''>
                    <h2 className='headdingContent headdingContentmai'>Make an impact </h2>
                    <h5 className='pb-3'>Support a meaningful cause!</h5>
                    <MakeImpactComponent />
                </section>
                <section className='headdingContentmai'>
                    <div className=''>
                        <DevineBlessingComponent />
                    </div>
                </section>
                <section className='pt-5'>
                    <h3 className='headdingContent pt-5 pb-4'>LIVE Streaming</h3>
                    <LiveStreamingComponent />
                </section>
                <section>
                    <Footer/>
                </section>
            </div>
        </>
    )
}

export default Home
