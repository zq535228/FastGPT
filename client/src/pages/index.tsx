import React, { useEffect, useState } from 'react';
import { Card, Box, Link, Flex, Image, Button } from '@chakra-ui/react';
import Markdown from '@/components/Markdown';
import { useMarkdown } from '@/hooks/useMarkdown';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/store/global';

import styles from './index.module.scss';
import axios from 'axios';
import MyIcon from '@/components/Icon';

const Home = () => {
  const router = useRouter();
  const { inviterId } = router.query as { inviterId: string };
  const { data } = useMarkdown({ url: '/intro.md' });
  const {
    isPc,
    initData: { beianText }
  } = useGlobalStore();
  const [star, setStar] = useState(1500);

  useEffect(() => {
    if (inviterId) {
      localStorage.setItem('inviterId', inviterId);
    }
  }, [inviterId]);

  /* 加载动画 */
  useEffect(() => {
    setTimeout(() => {
      try {
        window.particlesJS?.('particles-js', {
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 500
              }
            },
            color: {
              value: '#4e83fd'
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              },
              polygon: {
                nb_sides: 5
              }
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 0.1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 10,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#adceff',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        });
      } catch (error) { }
    }, 500);
  }, [isPc]);

  return (
    <Flex
      className={styles.home}
      position={'relative'}
      flexDirection={'column'}
      alignItems={'center'}
      h={'100%'}
      overflow={'overlay'}
    >
      <Box id={'particles-js'} position={'absolute'} top={0} left={0} right={0} bottom={0} />

      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        mt={'14vh'}
        position={'absolute'}
        userSelect={'none'}
      >
        <Image src="/icon/logo.png" w={['70px', '120px']} h={['70px', '120px']} alt={''}></Image>
        <Box
          className={styles.textlg}
          fontWeight={'bold'}
          fontSize={['40px', '70px']}
          letterSpacing={'5px'}
        >
          检验科AI知识库
        </Box>
        <Box className={styles.textlg} fontWeight={'bold'} fontSize={['15px', '24px']}>
          编文案、写课题论文、工作总结、考试出题、翻译...
        </Box>
        <Box className={styles.textlg} fontWeight={'bold'} fontSize={['20px', '30px']}>
          AI.检验大叔
        </Box>

        <Flex flexDirection={['column', 'row']} my={5}>

          <Button
            fontSize={['xl', '3xl']}
            h={'auto'}
            py={[2, 3]}
            onClick={() => router.push(`/model`)}
          >
            开始 AI 之旅
          </Button>
        </Flex>
      </Flex>

      <Box w={'100%'} mt={'60vh'} px={[5, 10]} pb={[5, 10]}>
        <Card p={5} lineHeight={2}>
          <Markdown source={data} isChatting={false} />
        </Card>

        <Card p={5} mt={4} textAlign={'center'}>
          {beianText && (
            <Link href="https://beian.miit.gov.cn/" target="_blank">
              {beianText}
            </Link>
          )}

          <Box>Made by 检验大叔.</Box>
        </Card>
      </Box>
    </Flex>
  );
};

export default Home;