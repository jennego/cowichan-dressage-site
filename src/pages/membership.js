import React from 'react'
import Layout from '../components/layout'
import Main from '../components/MainContent'
import { Parallax, Background } from 'react-parallax';

const Membership = () => {
  return(
    <Layout>
      <Main>

            <Parallax strength={300} style={{height: '70vh'}}>
        <Background>
            <img src="http://www.fillmurray.com/500/320" alt="fill murray" />
        </Background>
    </Parallax>

      <h2>Membership Form</h2>
      Entry form
      </Main>
    </Layout>
  )
}

export default Membership